const $ = require("jquery");
import { parseNetworkUrl } from './index';

/**
 * 解析淘宝页面查询
 */
export async function parseTaoBaoProductList() {
  let data = [];
  const itemsNodelist = $('#mainsrp-itemlist .m-itemlist .items').first().find('.item');
  $(itemsNodelist).each((index, element) => {
    const itemNode = $(element);
    const picLink = itemNode.find('.pic-link');
    data.push({
      productPic: parseNetworkUrl(picLink.find('img').data('src')),
      productId: picLink.data('nid'),
      productName: itemNode.find('.title > a').text().trim(),
      productHref: parseNetworkUrl(picLink.attr('href')),
      storeName: itemNode.find('.shopname').text().trim(),
      productPrice: Number(picLink.attr('trace-price')),
      payerNum: Number(itemNode.find('.deal-cnt').text().match(/\d+/))
    });
  });

  for(let i = 0; i < data.length; i++) {
    data[i].productDetail = await parseTaoboProductDetail(data[i].productId);
  }

  return data;
}

/**
 * 解析淘宝详情页信息
 * @param {*} url 
 */
export function parseTaoboProductDetail(productId) {
  return new Promise((resolve) => {
    window.bridge.postMessage(
      "api:fetch",
      {
        url: `https://detail.m.tmall.com/item.htm?id=${productId}`
      }, data => {
        const script = $(data).find('script').text();
        const _DATA_Detail = eval(`${script};_DATA_Detail`);
        const rate = _DATA_Detail && _DATA_Detail.rate || {};
        resolve({
          totalCommentCount: rate.totalCount || 0,
          commentKeywords: rate.keywords || []
        });
      }
    );
  });
}

export function parseTaobaoProductQuestion() {
  // https://h5.m.taobao.com/wendajia/question2017.html?refId=600473418838
}