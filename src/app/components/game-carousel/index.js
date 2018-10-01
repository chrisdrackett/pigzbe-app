import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import array from 'usfl/array/array';
import styles from './styles';

const Dot = ({active, light}) => (
    <View style={[
        [styles.dot],
        active ? styles.dot__active : null,
        light ? styles.dot__light : null,
    ]} />
);

export const Dots = ({length, index = 0, light=false}) => (
    <View style={[styles.dots, {width: 20 * length}]}>
        {array(length).map(n => (
            <Dot key={n} active={n === index} light={light} />
        ))}
    </View>
);

export default class GameCarousel extends Component {
  state = {
      currentIndex: 0,
  }

  static defaultProps = {
      Item: View,
      width: Dimensions.get('window').width,
      itemWidth: 200,
      data: []
  }

  onIndexChange = index => this.setState(() => ({currentIndex: index}))

  render() {
      const {Item, width, itemWidth, data} = this.props;
      const contentOffset = (width - itemWidth) / 2;

      return (
          <View style={styles.wrapper}>
              <SideSwipe
                  index={this.state.currentIndex}
                  itemWidth={itemWidth}
                  style={{width}}
                  data={data}
                  contentOffset={contentOffset}
                  onIndexChange={this.onIndexChange}
                  renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
                      <View style={[styles.itemWrapper, {width: itemWidth}]}>
                          <Item
                              {...item}
                              index={itemIndex}
                              currentIndex={currentIndex}
                              animatedValue={animatedValue}
                          />
                      </View>
                  )}
              />
              <View style={styles.dotsWrapper}>
                  <Dots
                      length={data.length}
                      index={this.state.currentIndex}
                  />
              </View>
          </View>
      );
  }
}
