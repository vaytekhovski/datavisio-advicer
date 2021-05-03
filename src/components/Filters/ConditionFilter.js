import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'



import '../../styles/ConditionFilter.css'

export default function ConditionFilter(props) {
    const [checked, setChecked] = React.useState(false);

    const handleCheckBoxChange = (event) => {
        setChecked(event.target.checked);
    };

    const [conditionArrow, setconditionArrow] = React.useState('');

    const handleSelectChange = (event) => {
        setconditionArrow(event.target.value);
    };

    const [value, setValue] = React.useState('');

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className="ConditionFilterContainer">
            <label className="ConditionFilerLabel">{props.condition}</label>
            <Checkbox
                color="primary"
                checked={checked}
                onChange={handleCheckBoxChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Select
                disabled={!checked}
                className="ConditionSelect"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={conditionArrow}
                displayEmpty
                onChange={handleSelectChange}
            >
                <MenuItem value="" disabled>Condition</MenuItem>
                <MenuItem value={1}>More</MenuItem>
                <MenuItem value={2}>Less</MenuItem>
                <MenuItem value={3}>More or equal</MenuItem>
                <MenuItem value={4}>Less or equal</MenuItem>
                <MenuItem value={5}>Equal</MenuItem>

            </Select>
            <Input
                disabled={!checked}
                className="ConditionValue"
                style={{ width: "99%" }}
                value={value}
                onChange={handleValueChange}
            />

        </div >
    )
}