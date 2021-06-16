import React, { useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {

  /* ------------ Animation --------------- */
  const cardRef = useRef(null)
  const priceRef = useRef(null)
  const imgRef = useRef(null)

  const mouseMove = useCallback((e)=>{
    const card = cardRef.current;
    if (card) {
      let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  },[cardRef])

  const mouseEnter = useCallback((e)=>{
    const card = cardRef.current;
    const title = priceRef.current;
    const img = imgRef.current;
    if(card && title && img) {
      card.style.transition = "none";
      //Popout
      title.style.transform = "translateZ(150px)";
    }
  },[cardRef, priceRef, imgRef])

  const mouseLeave = useCallback((e)=>{
    const card = cardRef.current;
    const title = priceRef.current;
    const img = imgRef.current;
    if(card && title && img) {
      console.log('mouseLeave')
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      //Popback
      title.style.transform = "translateZ(0px)";
    }
  },[cardRef, priceRef, imgRef])

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", mouseMove);
      card.addEventListener("mouseenter", mouseEnter);
      card.addEventListener("mouseleave", mouseLeave);
      card.style.perspective = '2000px'
    }
    return () => {

      if (card) {
        card.removeEventListener("mousemove", mouseMove);
        card.removeEventListener("mouseenter", mouseEnter);
        card.removeEventListener("mouseleave", mouseLeave);
      }
      
    }
  }, [mouseMove, mouseLeave, mouseEnter, cardRef]);

  /* --------- fin animation ----------- */
  

  return (
    <Card ref={cardRef} className='my-3 p-3' style={{opacity:'0.9', borderRadius:'25px', backgroundColor:'#2f343a', color:'white'}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img ref={imgRef} src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong style={{color:'white'}}>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text ref={priceRef} as='h3' style={{color:'white'}}>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

