const FormContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
};

export default FormContainer;
