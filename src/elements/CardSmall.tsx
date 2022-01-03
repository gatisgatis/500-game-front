export const CardSmall = ({ value }: { value?: number }) => {
  return (
    <div className="bg-blue-300 rounded mr-1 h-12 w-8 text-xl text-bold flex justify-center items-center">
      {value || null}
    </div>
  );
};
