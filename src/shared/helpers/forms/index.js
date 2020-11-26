
const mime = require('mime-types');
const getCountryCallingCode = require('libphonenumber-js').getCountryCallingCode;


exports.validateEmail = email => /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);

exports.validatePhone = phone => /^[0-9]+$/.test(phone);

exports.validateStringExistance = name => name && typeof name === 'string';

exports.validateFileSize = file => file && file.size && file.size / 1024 / 1024 < 10;

exports.validateFileType = file => file && file.type && (file.type === mime.lookup('.pdf') || file.type === mime.lookup('.doc') || file.type === mime.lookup('.docx'));

exports.validateFileExist = file => file;

exports.getFormattedListOfCountries = (locale, countries) => {
  const countriesByLang = countries.getNames(locale);
  const countriesThatHasCallingCode = Object.keys(countriesByLang).filter((countryCode) => {
    try {
      getCountryCallingCode(countryCode);
      return true;
    } catch (e) {
      return false;
    }
  });
  return countriesThatHasCallingCode.map(countryCode => ({
    value: getCountryCallingCode(countryCode),
    label: countriesByLang[countryCode],
    alpha3Code: countries.toAlpha3(countryCode),
  }));
};

exports.getXMLBodyNewsLetterForm = (email, name) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:json="JsonpAjaxService" xmlns:abf="http://schemas.datacontract.org/2004/07/ABFSG.Models.Case">
   <soapenv:Header/>
   <soapenv:Body>
      <json:CreateNewsLetterLead>
         <!--Optional:-->
         <json:insertData>
            <!--Optional:-->
            <abf:EMAIL>${email}</abf:EMAIL>
            <!--Optional:-->
            <abf:FIRSTNAME>${name}</abf:FIRSTNAME>
            <!--Optional:-->
            <abf:LASTNAME>${name}</abf:LASTNAME>
         </json:insertData>
      </json:CreateNewsLetterLead>
   </soapenv:Body>
</soapenv:Envelope>`;

exports.getXMLBodyForContactUsForm = formData => `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:json="JsonpAjaxService" xmlns:abf="http://schemas.datacontract.org/2004/07/ABFSG.Models.Case">
       <soapenv:Header/>
       <soapenv:Body>
          <json:CreateWebsiteLead>
             <!--Optional:-->
             <json:insertData>
                <!--Optional:-->
                <abf:COMPANYNAME>?</abf:COMPANYNAME>
                <!--Optional:-->
                <abf:COUNTRYCODE>${formData.countryCode.alpha3Code}</abf:COUNTRYCODE>
                <!--Optional:-->
                <abf:DESCRIPTION>${formData.message}</abf:DESCRIPTION>
                <!--Optional:-->
                <abf:EMAIL>${formData.email}</abf:EMAIL>
                <!--Optional:-->
                <abf:FIRSTNAME>${formData.firstName}</abf:FIRSTNAME>
                <!--Optional:-->
                <abf:LASTNAME>${formData.lastName}</abf:LASTNAME>
                <!--Optional:-->
                <abf:PHONENUMBER>${formData.phone}</abf:PHONENUMBER>
             </json:insertData>
          </json:CreateWebsiteLead>
       </soapenv:Body>
    </soapenv:Envelope>
`;
