/**
 * A React component that generates an Excel file based on user input from a form.
 * @module GenerateExcel
 * @requires React
 * @requires useState
 * @requires Form
 */

import {React, useState} from 'react'
import Form from './Form';

/**
 * Generates an Excel file based on user input from a form.
 * @function
 * @returns {JSX.Element} A React component
 */
function GenerateExcel() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    /**
     * Handles form submission by making a POST request to the server with the user's name and email. 
     * If successful, downloads the Excel file.
     * @async
     * @function
     * @param {object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/form-generate-excel', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email})
        });

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'form_data.xlsx';
        document.body.appendChild(link);
        link.click();
    }
    
    return (
        <>
            <div className='container text-center'></div>
            <Form handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail} />
        </>
    )
}

export default GenerateExcel;
