import axios from 'axios';

const mockedBody = {"uid":"74761321.1607412002297","service_id":114,"service_name":"chosun.com","service_type":"news","public_key":"7586f49d991ac79e8fadf4852def3daa","widget_id":"ml6jr2l4","source":"HRV36IP7EVAF7EDOI5G5WC3ADQ","url":"https://www.chosun.com/national/regional/2021/01/03/HRV36IP7EVAF7EDOI5G5WC3ADQ/","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36","size":6,"page":1,"device":"COMPUTER","country":"KR","ip_addr":"221.153.142.18","channel":"하단_그리드_PC.Test_adslot","cid":"74761321.1607412002297","lang":"ko","service_lang":"ko","pixel_ratio":1,"with_vrpm":"1","currency":"KRW","ref":"https://www.chosun.com/","debug":"1","nolog":"1","noreqlog":"0","network":"non-wifi","with_mini_contents":"1","item_cat":"전국","bcat":["IAB7-39","IAB9-7","IAB9-9","IAB14-3","IAB23","IAB25-2","IAB25-3","IAB25-4","IAB25-5","IAB25-6","IAB26","IAB11-4"],"ad_params":{},"force_adx":false};

const requestAdhub = async () => {
  let resp = '';
  try {
    const res = await axios({
      method: 'POST',
      data: mockedBody,
      url: 'http://localhost:4007/hub/dable',
    });

    console.log('responsed data:', JSON.stringify(res.data, null, 2));
    return res.data;
  } catch (e) {
    throw `requestAdhub error: ${e}`;
  }
};

export { requestAdhub }