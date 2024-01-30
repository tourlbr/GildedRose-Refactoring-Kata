export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum ItemTypes {
  AGED_BRIED = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  CONJURED = 'Conjured'
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemTypes.AGED_BRIED:
          this.updateAgedBrieItem(item);
          break;
        case ItemTypes.BACKSTAGE_PASSES:
          this.updateBackstagePassesItem(item);
          break;
        case ItemTypes.SULFURAS:
          this.updateSulfurasItem(item);
          break;
        case ItemTypes.CONJURED:
          this.updateConjuredItem(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }
    }

    return this.items;
  }

  private updateNormalItem(item: Item) {
    if (this.isBetweenMinMaxQuality(item.quality)) {
      item.quality = item.quality - 1;
    }

    if (item.sellIn < 0 && this.isBetweenMinMaxQuality(item.quality)) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;
  }

  private updateAgedBrieItem(item: Item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;
    }

    if (item.sellIn < 0 && item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;
  }

  private updateBackstagePassesItem(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn >= 0 && item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;

      if (item.sellIn <= 10 && item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1;
      }

      if (item.sellIn <= 5 && item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1;
      }
    }

    item.sellIn = item.sellIn - 1;
  }

  private updateSulfurasItem(item: Item) {
    item.quality = 80;

    return item
  }

  private updateConjuredItem(item: Item) {
    if (item.quality > (MIN_QUALITY + 2) && item.quality < MAX_QUALITY) {
      item.quality = item.quality - 2;
    }

    if (item.sellIn < 0 && (item.quality > 2 && item.quality < MAX_QUALITY)) {
      item.quality = item.quality - 2
    }

    item.sellIn = item.sellIn - 1;
  }

  private isBetweenMinMaxQuality(quality: number): boolean {
    return quality > MIN_QUALITY && quality < MAX_QUALITY
  }
}
