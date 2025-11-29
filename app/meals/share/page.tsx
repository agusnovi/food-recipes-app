import { shareMeal } from "@/lib/actions";
import ImagePicker from "@/components/images/image-picker"
import MealFormSubmiting from "@/components/meals/meal-form-submiting";

import styles from './page.module.scss';

export default function SharePages() {  
    return (
      <>
        <header className={styles.header}>
          <h1>
            Share your <span className={styles.highlight}>favorite meal</span>
          </h1>
          <p>Or any other meal you fell need sharing!</p>
        </header>
        <main className={styles.main}>
          <form className={styles.form} action={shareMeal}>
            <div className={styles.row}>
              <p>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </p>
              <p>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </p>
            </div>
            <p>
              <label htmlFor="title">Title</label>
              <input id="title" type="text" name="title" required />
            </p>
            <p>
              <label htmlFor="summary">Short Summary</label>
              <input type="text" required id="summary" name="summary" />
            </p>
            <p>
              <label htmlFor="instructions">Intructions</label>
              <textarea id="instructions" name="instructions" required />
            </p>
            <ImagePicker name="image" label="Image Picker" />
            <p className={styles.actions}>
              <MealFormSubmiting />
            </p>
          </form>
        </main>
      </>
    );
}