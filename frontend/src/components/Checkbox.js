import React from 'react';

const Checkbox = ({ label, checked, onChange }) => (
    <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
        Aceito os termos e condições. 
    </label>
);

export default Checkbox;
