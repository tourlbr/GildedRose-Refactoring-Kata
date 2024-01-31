import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', function () {
  describe('Normal items', () => {
    it('Should lower both values for every item by the end of the day', () => {
      const itemMock1 = [
        new Item('foo', 10, 10)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9);
      expect(items[0].sellIn).toEqual(9);
    });

    it('Should degrade quality twice as fast, once the sell by date has passed', () => {
      const initalNegativeSellIns = [-1, -2];
      initalNegativeSellIns.map(sellIn => {
        const itemMock1 = [
          new Item('foo1', sellIn, 10)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);
        expect(items[0].sellIn).toEqual(sellIn - 1);
      });
    });

    it('Should never return a negative value for quality', () => {
      const initalQuality = [1, 0];
      initalQuality.map(quality => {
        const itemMock1 = [
          new Item('foo1', 10, quality)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
      })
    });


    it('Should never return a quality more than 50', () => {
        const itemMock1 = [
          new Item('foo1', 10, 50)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });
  });

  describe('Age Bried', () => {
    it('Should increase quality when sellIn date gets closer', () => {
      const itemMock1 = [
        new Item('Aged Brie', -1, 1)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(3);
    });
  });

  describe('Backstage passes', () => {
    it('Should increase in quality by 1 when there are more than 10 days', () => {
      const itemMock1 = [
        new Item('Backstage passes to a TAFKAL80ETC concert', 11, 40)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(41);
      expect(items[0].sellIn).toEqual(10);
    });

    it('Should increases by 2 when there are 10 days or less', () => {
      const days = [10, 9, 8, 7, 6];
      days.map(day => {
        const itemMock1 = [
          new Item('Backstage passes to a TAFKAL80ETC concert', day, 40)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(40 + 1 + 1);
        expect(items[0].sellIn).toEqual(day - 1);
      });
    });

    it('Should increase by 3 when there are 5 days or less', () => {
      const days = [5, 4, 3, 2, 1];
      days.map(day => {
        const itemMock1 = [
          new Item('Backstage passes to a TAFKAL80ETC concert', day, 40)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(40 + 1 + 1 + 1);
        expect(items[0].sellIn).toEqual(day - 1);
      });
    });

    it('Should drop to zero after the concert', () => {
      const itemMock1 = [
        new Item('Backstage passes to a TAFKAL80ETC concert', -1, 40)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe('Sulfuras', () => {
    it('should quality never down', () => {
      const itemMock1 = [
        new Item('Sulfuras, Hand of Ragnaros', 10, 40)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
    });

    it('should always have quality equals 80', () => {
      const itemMock1 = [
        new Item('Sulfuras, Hand of Ragnaros', 10, 80)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
    });
  });

  describe('Conjured', () => {
    it('Should degrade quality twice as fast', () => {
      const itemMock1 = [
        new Item('Conjured', 10, 10)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
      expect(items[0].sellIn).toEqual(9);
    });

    it('Should degrade quality twice as fast when sellIn date has past', () => {
      const itemMock1 = [
        new Item('Conjured', -1, 10)
      ];
      const gildedRose = new GildedRose(itemMock1);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(6);
      expect(items[0].sellIn).toEqual(-2);
    });
  });
});