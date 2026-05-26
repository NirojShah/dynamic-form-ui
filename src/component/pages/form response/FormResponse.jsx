import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import formsApi from '../../../utility/forms.api';
import BackButton from '../../common/BackButton';
import DynamicResponseTable from '../../common/DynamicResponseTable';

const FormResponse = () => {
    const { formId } = useParams()
    const [response, setResponse] = useState([]);
    const [fields, setFields] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        // setPage(1);
        // setLimit(10);
        const fetchResponse = async (formId) => {
            const resp = await formsApi.getResponses({ key: formId, page, limit })
            setResponse(resp.data);
            setFields(resp.fields);
        }
        fetchResponse(formId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formId])

    return (
        <div className='flex flex-col items-start gap-2'>
            <BackButton title={"My form"} />
            <DynamicResponseTable fields={fields} data={response} />
        </div>
    )
}

export default FormResponse