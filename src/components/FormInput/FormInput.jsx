const FormInput = ({ label, ...other }) => {
  return (
    <>
      <label>{label}</label>
      <input {...other} />
    </>
  );
};

export default FormInput;
