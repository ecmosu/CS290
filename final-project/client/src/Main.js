import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import TicketDetail from './TickerDetail';

const items = [
  {
    src: 'main-newyorkskyline.jpg',
    ticker: 'SPY',
    market: 'S&P 500',
    caption: 'As tracked by SPY'
  },
  {
    src: 'main-nyse.jpg',
    ticker: 'DIA',
    market: 'DOW',
    caption: 'As Tracked By DIA'
  },
  {
    src: 'main-wallstreetsign.jpg',
    ticker: 'IWM',
    market: 'Russell 2000',
    caption: 'as tracked by IWM'
  }
  //Photo by Rick Tap on Unsplash
  //Photo by Aditya Vyas on Unsplash
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="img-fluid" src={item.src} alt={item.market} />
          <CarouselCaption captionText={item.caption} captionHeader={item.market} />
        </CarouselItem>
      );
    });

    return (
      <div className="mt-3">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          ride="carousel"
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>

        <TicketDetail ticker={items[this.state.activeIndex].ticker}></TicketDetail>
      </div>
    );
  }
}