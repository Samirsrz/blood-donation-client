


const SelectOptions = ({ district }) => {
    const { id, name } = district;

    return (
        <option value={id}>{name}</option>
    );
};

export default SelectOptions;
