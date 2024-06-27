# Solidity API

## Geolocation

### GeoLocation

```solidity
struct GeoLocation {
  string latitude;
  string longitude;
  string additionalInfo;
}
```

### geolocations

```solidity
mapping(string => struct Geolocation.GeoLocation) geolocations
```

### GeolocationAdded

```solidity
event GeolocationAdded(string id, string latitude, string longitude, string additionalInfo)
```

### setGeolocation

```solidity
function setGeolocation(string id, string latitude, string longitude, string additionalInfo) public
```

### getGeolocation

```solidity
function getGeolocation(string id) public view returns (struct Geolocation.GeoLocation)
```

