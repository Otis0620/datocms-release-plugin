import styles from './styles.module.css';

type BlankSlateProps = {
  description: string;
};

const BlankSlate = ({ description }: BlankSlateProps) => {
  return (
    <div className={styles.blankSlateContainer}>
      <h1 className={styles.blankSlateTitle}>Empty Records</h1>
      <p className={styles.blankSlateDescription}>{description}</p>
    </div>
  );
};

export default BlankSlate;
