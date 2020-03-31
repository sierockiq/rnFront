/**
 * Sort through the mass amounts of data in
 * an endpoint and return the featured image URL
 */
// eslint-disable-next-line
export const getFeaturedImageUrl = (item) => (
  (item._embedded
      && item._embedded['wp:featuredmedia']
      && item._embedded['wp:featuredmedia']['0']
      && item._embedded['wp:featuredmedia']['0'].media_details
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes.full
      && item._embedded['wp:featuredmedia']['0'].media_details.sizes.full.source_url)
    || null
);

export const getImage = function(name) {
    switch (name) {
      case "tomate":
        return require('../images/tomate.png');
      case "radis":
        return require('../images/radis.png');
      case "melon":
        return require('../images/melon.png');
      case "concombre":
        return require('../images/concombre.png');
      case "hulk":
        return require('../images/tomate.png');
      default:
        return require('../images/tomate.png');
    }
  };
