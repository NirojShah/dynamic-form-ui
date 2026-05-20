import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import FieldLibrary from "../../../form/FieldLibrary";
import CreateForm from "../create-form/CreateForm";
import FieldLayout from "../../../form/FieldLayout";

import formsApi from "../../../../utility/forms.api";
import formFieldStore from "../../../../store/fields.store";

const UpdateFormPage = () => {
    const { title, organization } = useParams();

    const addField = formFieldStore((s) => s.addField);
    const fields = formFieldStore((s) => s.fields);
    const removeField = formFieldStore((s) => s.removeField);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadForm();
    }, []);

    const clearFields = () => {
        fields.forEach((f) => {
            removeField(f.id);
        });
    };

    const loadForm = async () => {
        try {
            const resp = await formsApi.getForm({
                title,
                organization,
            });

            const form = resp.data.fields;
            // CLEAR OLD FIELDS
            clearFields();

            // MAP API → STORE FORMAT
            const mappedFields = form.map((f) => ({
                id: f.key,
                key: f.key,

                type: f.type,
                label: f.label,
                placeholder: f.placeholder || "",

                required: f.required || false,
                hidden: f.hidden || false,

                helpText: f.helpText || "",
                refSchemaId: f.refSchemaId || null,

                options:
                    f.options?.map((o) => o.label) || [],

                maxStars: f.maxStars || 5,

                min: f.min ?? 1,
                max: f.max ?? 10,

                level: f.level || "h2",
            }));

            console.log({ mappedFields })
            // ADD TO ZUSTAND STORE
            mappedFields.forEach((field) => {
                console.log({ field })
                addField(field);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex h-screen bg-[#f5f5f3]">
            <CreateForm mode="update" />
        </div>
    );
};

export default UpdateFormPage;