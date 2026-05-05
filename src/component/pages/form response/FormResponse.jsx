import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import formsApi from '../../../utility/forms.api';
import BackButton from '../../common/BackButton';

const FormResponse = () => {
    const { formId } = useParams()
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchResponse = async (formId) => {
            const resp = await formsApi.getResponses(formId)
            setResponse(resp.data)
        }

        fetchResponse(formId);
    }, [])

    return (
        <div className='flex flex-row'>
            <BackButton title={"My form"} />
            
        </div>
    )
}

export default FormResponse