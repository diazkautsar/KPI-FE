import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { addCourse } from '../services/course';
import { getModules } from '../services/modules';
import { getImageKitToken, uploadImageKit } from '../services/util';
import { getImagePreview } from '../utils/getImagePreview';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    [key: string]: string | undefined | string[] | null | File;
    name: string;
    description: string;
    keyword?: string;
    modules: string[];
    file: File | null;
}

const FormCourse: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        description: '',
        keyword: '',
        modules: [] as string[],
        file: null,
    });
    const [validated, setValidated] = useState(false);
    const [modules, setModules] = useState<{ value: string; label: string }[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIstLoading] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        getModules().then((response) => {
            const data = response.data as any[];
            setModules([
                ...modules,
                ...data.map((item) => ({
                    label: item.name,
                    value: item.id,
                })),
            ]);
        });
        return () => {};
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let valuUpdated: any = value;
        if (name === 'modules' && event.target.checked) {
            const valueModules = [...formValues.modules];
            valueModules.push(value);
            valuUpdated = valueModules;
        }

        if (name === 'modules' && !event.target.checked) {
            valuUpdated = formValues.modules.filter((item) => item !== value);
        }

        setFormValues({ ...formValues, [name]: valuUpdated });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        console.log(file);
        setFormValues({ ...formValues, file });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIstLoading(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        const coverImageBase64: any = await getImagePreview(formValues.file);
        const response = await getImageKitToken();
        const dataImageKit = response.data;

        const responseUpload = await uploadImageKit({
            file: coverImageBase64,
            publicKey: dataImageKit.publicKey,
            signature: dataImageKit.signature,
            expire: dataImageKit.expire,
            token: dataImageKit.token,
            fileName: formValues.name,
        });

        if (responseUpload.status !== 200) {
            setIstLoading(false);
            setToastMessage('Upload image to imagekit failed');
            setToastTitle('Upload Image Failed');
            setShowToast(true);

            return;
        }

        const responseAddCourse = await addCourse({
            name: formValues.name,
            description: formValues.description,
            cover_image: responseUpload.data.url,
            keyword: formValues.keyword,
            modules: formValues.modules,
        });

        if (!responseAddCourse.success) {
            setIstLoading(false);
            setShowToast(true);
            setToastTitle(responseAddCourse.messageTitle);
            setToastMessage(responseAddCourse.message);

            return;
        }

        setIstLoading(false);
        setShowToast(true);
        setToastTitle(responseAddCourse.messageTitle);
        setToastMessage(responseAddCourse.message);
        navigate('/dashboard/course');
    };

    return (
        <React.Fragment>
            {modules.length && (
                <div style={{ margin: '5rem 10rem' }}>
                    <Form onSubmit={handleSubmit} noValidate validated={validated}>
                        <Form.Group controlId="formName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your description.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formKeyword" className="mt-3">
                            <Form.Label>Keyword</Form.Label>
                            <Form.Control
                                type="text"
                                name="keyword"
                                value={formValues.keyword}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSelectModule" className="mt-3">
                            <div>
                                {' '}
                                <Form.Label>Modules</Form.Label>{' '}
                            </div>
                            <div>
                                {modules.map((item, index) => {
                                    return (
                                        <Form.Check
                                            required
                                            key={index}
                                            inline
                                            label={item.label}
                                            value={item.value}
                                            name="modules"
                                            type="checkbox"
                                            onChange={handleInputChange}
                                        />
                                    );
                                })}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mt-3">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control required type="file" name="file" onChange={handleFileChange} />
                        </Form.Group>

                        <Button disabled={isLoading} variant="primary" type="submit" className="mt-3">
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </Form>
                </div>
            )}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{ position: 'absolute', top: '5rem', right: '1rem' }}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </React.Fragment>
    );
};

export default FormCourse;
