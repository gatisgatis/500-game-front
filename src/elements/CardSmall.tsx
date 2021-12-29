export const CardSmall = ({ value }: { value?: number }) => {
  return (
    <div className="bg-blue-300 rounded h-12 w-8 mr-2 text-xl text-bold flex justify-center items-center">
      {value || null}
    </div>
  );
};
