# Angular Think Ministry

An Angular module that integrates the npm package for interacting with the
Think Ministry platform.

## Getting Started

Include the script in your HTML.

```html
<script type="text/javascript" src="angular-think-ministry.js">
```

Include and configure the angular module.

```javascript
angular.module('yourapp', ['ngThinkMinistry'])

angular.module('yourapp').config(function(ThinkMinistryProvider) {
  ThinkMinistryProvider.baseUrl = '/ministryplatformapi/PlatformService.svc'
});
```

## Usage

There's an assumption that the API end point that you're using is managing
access tokens for you. The think-ministry/middleware module can handle most of
this for you.

### Fetching Data

```javascript
angular.module('yourapp').controller('ContactCtrl', function(thinkMinistry) {
  thinkMinistry.get('GetPageRecord?pageId=292&recordId=' + contactId).success(function(contact) {
    $scope.contact = contact;
  }).error(function(err) {
    $scope.error = err;
  });
});
```

The thinkMinistry get method handles tranforming the response from the Think
Ministry JSON format to a more "standard" JavaScript object.

For example this response from Think Ministry:

```javascript
{ 
  Data: [ [ 2, 'Female' ], [ 1, 'Male' ] ],
  Fields: [ 
    { DataType: 5, Index: 0, Name: 'dp_RecordID' },
    { DataType: 0, Index: 1, Name: 'dp_RecordName' } 
  ],
  SelectedRecords: 0,
  TotalRecords: 2 
}
```

Will be converted to this:

```javascript
[
  { dpRecordId: 2, dpRecordName: 'Female' },
  { dpRecordId: 1, dpRecordName: 'Male' }
]
```

### Updating Data

```javascript
angular.module('yourapp').controller('ContactCtrl', function(thinkMinistry) {
  $scope.update = function() {
    thinkMinistry.post('UpdatePageRecord?pageId=292').success(function() {
      console.log('Contact updated successfully');
    }).error(function(err) {
      console.log('Error while updating contact ' + err);
    });
  }
});
```

The thinkMinistry post method handles transforming the request from a
"standard" JavaScript object to the format that Think Ministry expects.

For example this object:

```javascript
{
  contactId: 424242,
  firstName: 'Michael',
  lastName: 'Jordan'
}
```

Will be converted to the format that Think Ministry expects:

```javascript
[
  { Key: 'contact_id', Value: 424242 },
  { Key: 'first_name', Value: 'Michael' },
  { Key: 'last_name', Value: 'Jordan' }
]
```
