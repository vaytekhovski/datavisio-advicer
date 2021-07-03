import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment';




import '../../styles/ConditionFilter.css'

export default function ConditionFilter(props) {
    const [checked, setChecked] = React.useState(props.value.checked);
    const [conditionArrow, setConditionArrow] = React.useState(props.value.condition);
    const [value, setValue] = React.useState(props.value.value);
    const [length, setLength] = React.useState(props.value.length);

    // React.useEffect(() =>{
    //     props.onChange({
    //         checked: checked,
    //         condition: conditionArrow,
    //         value: value,
    //         length:length
    //     });
    // })

    const handleCheckBoxChange = (event) => {
        setChecked(event.target.checked);
        props.onChange({
            checked: event.target.checked,
            condition: conditionArrow,
            value: value,
            length:length
        });
    };

    const handleSelectChange = (event) => {
        setConditionArrow(event.target.value);
        props.onChange({
            checked: checked,
            condition: event.target.value,
            value: value,
            length: length
        });
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
        props.onChange({
            checked: checked,
            condition: conditionArrow,
            value: event.target.value,
            length:length
        });
    };

    const handleLengthChange = (event) =>{
        setLength(event.target.value);
        props.onChange({
            checked: checked,
            condition: conditionArrow,
            value: value,
            length: event.target.value
        });
    }

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
                <MenuItem value={1}>Growth</MenuItem>
                <MenuItem value={2}>Fall</MenuItem>
                {/* <MenuItem value={3}>Growth or equal</MenuItem>
                <MenuItem value={4}>Fall or equal</MenuItem>
                <MenuItem value={5}>Equal</MenuItem> */}

            </Select>
            <Input
                disabled={!checked}
                className="ConditionValue"
                style={{ width: "99%" }}
                value={value}
                onChange={handleValueChange}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <Input
                disabled={!checked}
                className="ConditionValue"
                style={{ width: "99%" }}
                value={length}
                onChange={handleLengthChange}
                endAdornment={<InputAdornment position="end">h</InputAdornment>}

            />

        </div >
    )
}