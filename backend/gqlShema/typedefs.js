const {gql}=require('apollo-server-express')
const typeDefs=gql`
scalar Date
scalar Time
scalar DateTime
type User{
    _id:ID
    username:String
    fullName:String
    shipment:Shipment
    hubID:Int
    userType:String
    mobile:String
 }
 type Hub{
     _id:ID
     hubName:String
     hubID:String
     hubAddress:String
 }
 type Location{
    _id:ID
    country:String
    city:String
    specialName:String
}
type CountReport{
    allshipments:Int
    canceled:Int
    returned:Int
    onprogress:Int
    delivered:Int
}
 type Shipment{
    _id:ID
    shipmentID:String
    pickupDate:Date
    customer:Customer
    customerID:String
    image:String
    locationAddress:String
    hubID:String
    deliveryETA:DateTime
    warehouse:Warehouse
    shipmentStatus:String
    shipmentSubStatus:String
    orgDeliveryDate:Date
    actualReceivedDate:Date
    driverAssigned:Int
    driver:User
    CODAmount:Int
    count:Int
    currency:String
    createdAt:Date
}
type Warehouse{
    _id:ID
    warehouseID:String
    country:String
    city:String
    exactLocation:String
    cutofTimeType:String
    cutoffTime:DateTime
    status:Boolean
    conatactPerson:String
    contactPhone:String
    alternativeContact:String
}
type Customer{
    _id:ID
    fullName:String
    customerID:String
    shipment:[Shipment]
    contactPerson:String
    contactPersonPhone:String
    phoneNumber:String
    locationAddress:String
}
type Transact{
    _id:ID
    hubID:Int
    collectedBy:Int
    collector:User
    CODAmount:Int
    currency:String
    driverAssigned:Int
    driver:User
    createdAt:DateTime
}
input ShipmentInputFilter {
    canceled:Boolean
    returned:Boolean
    onprogress:Boolean
    delivered:Boolean
    }
input ShipmentInputSort {
    filter:String
    }

type Query{
getUser(_id:Int!):User
getAllDriver:[User]
collectCOD:[Shipment]
getCODShipment(driverAssigned:Int!):[Shipment]
getAllShipment:[Shipment]
getAllWarehouse:[Warehouse]
getAllShipmentGroupByDriver(input:ShipmentInputSort):[Shipment]
getHubStatus(input:ShipmentInputSort):[Shipment]
getAllShipmentGroupByHub(input:ShipmentInputSort):[Shipment]
getAllShipmentGroupByDate(input:ShipmentInputSort):[Shipment]
getAllShipmentByDate(input:ShipmentInputSort):[Shipment]
getAllShipmentCount(input:ShipmentInputSort):CountReport
getFilteredShipment(input:ShipmentInputFilter):[Shipment]
getShipment(_id:Int!):Shipment
getCustomer(_id:Int!):Customer
Hub:[Hub]
Location:[Location]
getLocation(_id: Int!):Location
getPickupLocation(warehouseID: String!):[Warehouse]
getAllPickupLocation:[Warehouse]
getHub(hubID: Int!):Hub
getActiveDriver:[User]
getAllWarehouseID:[Warehouse]
getTransaction:[Transact]
}


`
module.exports=typeDefs
