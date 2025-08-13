interface DataCardProps {
  title: string;
  description: string;
  date: string | null;
  borderColor: string;
}

const DataCard = ({ title, description, date, borderColor }: DataCardProps) => {
  return (
    <div className={`card ${borderColor}`}>
      <h2 className="text-title">{title}</h2>
      <p className="text-body">{description}</p>
      <p className="text-data">
        {date}
      </p>
    </div>
  );
};
