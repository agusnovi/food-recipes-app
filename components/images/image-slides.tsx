'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./image-slides.module.scss"

const images = [
  {
    image: 'https://food-s3-nextjs-img.s3.amazonaws.com/burger.jpg',
    alt: 'Burger',
  },
  {
    image: 'https://food-s3-nextjs-img.s3.amazonaws.com/curry.jpg',
    alt: 'Curry',
  },
  {
    image: 'https://food-s3-nextjs-img.s3.amazonaws.com/dumplings.jpg',
    alt: 'Dumplings',
  },
  {
    image: 'https://food-s3-nextjs-img.s3.amazonaws.com/macncheese.jpg',
    alt: 'Macncheese',
  },
  {
    image: 'https://food-s3-nextjs-img.s3.amazonaws.com/pizza.jpg',
    alt: 'Pizza',
  },
];

export default function ImageSlideshow() {
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prev => {
                return prev === (images.length - 1) ? 0 : prev + 1;
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.slides}>
            {
                images.map((image, idx) => {
                    return (
                      <Image
                        key={idx}
                        className={
                          idx === imageIndex ? styles.active : undefined
                        }
                        src={image.image}
                        alt={image.alt}
                        priority
                        fill
                      />
                    );
                })
            }
      </div>
    );
}