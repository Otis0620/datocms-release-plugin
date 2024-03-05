import styles from './styles.module.css';

type RecordItemProps = {
  title: string;
};

const RecordItem = ({ title }: RecordItemProps) => {
  return (
    <div className={styles.row}>
      <div className={styles.column}>{title}</div>
    </div>
  );
};

export default RecordItem;
