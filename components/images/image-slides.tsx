'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

import burger from "@/public/images/burger.jpg";
import curry from '@/public/images/curry.jpg';
import dumplings from '@/public/images/dumplings.jpg';
import macncheese from '@/public/images/macncheese.jpg';
import pizza from '@/public/images/pizza.jpg';

import styles from "./image-slides.module.scss"

const images = [
  { image: burger, alt: 'Burger' },
  { image: curry, alt: 'Curry' },
  { image: dumplings, alt: 'Dumplings' },
  { image: macncheese, alt: 'Macncheese' },
  { image: pizza, alt: 'Pizza' },
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
                      />
                    );
                })
            }
      </div>
    );
}