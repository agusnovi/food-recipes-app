'use client'

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"

import styles from "./image-picker.module.scss";

export default function ImagePicker({ label, name }: { label: string, name: string }) {
    const imageInput = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<
      string | ArrayBuffer | null
    >(null);

    function handleClickButton() {
        imageInput.current?.click();
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        
        if (!file) {
            setSelectedImage(null);
            return;
        }

        
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setSelectedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }

    return (
      <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.control}>
          <input
            className={styles.input}
            ref={imageInput}
            name={name}
            id={name}
            accept="image/png, image/jpeg "
            type="file"
                    onChange={handleImageChange}
                    required
          />
          <div className={styles.preview}>
            {selectedImage && (
              <Image src={selectedImage as string} alt="image picked" fill />
            )}
            {!selectedImage && <p>No image.</p>}
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={handleClickButton}
          >
            Pick an image
          </button>
        </div>
      </div>
    );
}