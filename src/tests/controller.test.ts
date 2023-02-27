import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
import EmployeeService from '../services/employeeServices';
import { NoEmployeeError, constants } from '../assets/constants';
import EmployeeController from '../contollers/employeeController'

const employeeURL:string = 'http://127.0.0.1:8000/employees' || process.env.employeeURL;
const baseURL = "http://127.0.0.1:8000/" || process.env.BaseURL;
let newEmployeeID = "";
let newEmployee = [];
let internID = "";
let managerID = "1676527316022"
//****************Working Tests **********************/
describe('GET /', () => {
  describe('When you hit baseURL',()=>{
    it('should display Application Description', async () => {
      const res = await axios.get(baseURL)
      expect(res.status).toBe(200)
      expect(res.data).toContain("This is a Employee ERP System");
    })
  })
})

describe('GET /employees',()=>{
  describe('When fetching All Employees', () => {
    it('should fetch All available Employees', async () => {     
      const res = await axios.get(employeeURL)
      expect(res).toBeTruthy()
      expect(res.data.length).toBeGreaterThanOrEqual(4)
      expect(res.status).toBe(200)
    })
    it('should fetch available Employees with mandatory parameters',async ()=>{
      const res = await axios.get(employeeURL)
      res.data.forEach(element => {
        expect(element.id).not.toBeNull()
        expect(element).toHaveProperty("firstName")
        expect(element).toHaveProperty("lastName")
        expect(element).toHaveProperty("email")
        expect(element).toHaveProperty("contact")
        expect(element).toHaveProperty("dob")
        expect(element).toHaveProperty("doj")
        expect(element).toHaveProperty("level")
      });
    })
  })
})

describe('POST /employees', () => {
  describe('When Adding Single Employee for Pre-Condition ', () => {
    it('should Add New Employee', async () => {
      const res = await axios.post(employeeURL,
        {
        "firstName": "Soham",
        "lastName": "Patel",
        "email": "soham@gmail.com",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Developer",
        "manager": "1676527316022"
        }
      )
      newEmployeeID = res.data.id;
      newEmployee = res.data;
      expect(res.status).toBe(200)
      expect(res.data.id).not.toBeNull()
      expect(res.data).toHaveProperty("id")
      expect(res.data).toHaveProperty("firstName")
      expect(res.data).toHaveProperty("lastName")
      expect(res.data).toHaveProperty("email")
      expect(res.data).toHaveProperty("contact")
      expect(res.data).toHaveProperty("dob")
      expect(res.data).toHaveProperty("doj")
      expect(res.data).toHaveProperty("level")
    })
    it('should return newly created Employee', async () => {
      const res = await axios.get(employeeURL+'/'+newEmployeeID)
      expect(res.data).toHaveProperty("id",newEmployeeID)
      expect(res.data.id).not.toBeNull()
      expect(res.status).toBe(200)
    })
    it('should have length of 5 and should not be null',async () =>{
      const res = await axios.get(employeeURL)
      expect(res.data).toHaveLength(5)
      expect(typeof res.data).toBe('object')
    })
  })
  describe('When Creating New Employee with Existing Employee Email', () => {
    it('should throw Duplicate Email Error', async () => {
      await axios.post(employeeURL,
        {
        "firstName": "Soham",
        "lastName": "Sanghvi",
        "email": "soham@gmail.com",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Developer",
        "manager": "1676527316022"
        }
      )
      .catch(function(error){
        expect(error.response.status).toBe(400)
        expect(error.response.statusText).toContain("Bad Request")
        expect(error.response.data).toEqual({ error: constants.duplicateEmailError })
      })
    })
  })
  describe('When Creating New Employee with Invalid Employee Parameters', () => {
    it('should throw firstName invalid Error', async () => {
      await axios.post(employeeURL,
        {
        "firstName": 123,
        "lastName": "Sanghvi",
        "email": "soham@gmail.com",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Developer",
        "manager": "1676527316022"
        }
      )
      .catch(function(error){
        expect(error.response.status).toBe(400)
        expect(error.response.statusText).toContain("Bad Request")
        expect(error.response.data).toEqual({"error": constants.invalidFirstNameError})
      })
    })
    it('should throw Invalid level Error', async () => {
      await axios.post(employeeURL,
        {
        "firstName": "Rohan",
        "lastName": "Sanghvi",
        "email": "rohan@gmail.com",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Painter",
        "manager": "1676527316022"
        }
      )
      .catch(function(error){
        expect(error.response.status).toBe(400)
        expect(error.response.statusText).toContain("Bad Request")
        expect(error.response.data).toEqual({"error": constants.invalidLevelError})
      })
    })
  })
  describe('When Creating New Employee with missing Employee properties', () => {
    it('should throw Insufficient Attributes Error', async () => {
      await axios.post(employeeURL,
        {
        "firstName": "Soham",
        "lastName": "Sanghvi",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Developer",
        "manager": "1676269842270"
        }
      )
      .catch(function(error){
        expect(error.response.status).toBe(400)
        expect(error.response.statusText).toContain("Bad Request")
        expect(error.response.data).toEqual({"error": constants.insufficientParametersError})
      })
    })
  })
})

describe('POST /employees',()=>{
  describe('When Creating Single Employee with all Necessary Properties', () => {
    it('should Add New Employee', async () => {
      const res = await axios.post(employeeURL,
        {
        "firstName": "Leo",
        "lastName": "Dominica",
        "email": "leo@gmail.com",
        "contact": "1234123412",
        "dob": "21/02/1992",
        "doj": "25/02/2020",
        "level": "Intern",
        "manager": managerID.toString()
        }
      )
      internID = res.data.id;
      expect(res.status).toBe(200)
      expect(res.data).toHaveProperty("id")
    })
  })
  describe('When fetching a Non-Available Employee', ()=>{
    it('should throw No Employee Error',async()=>{
      await axios.get(employeeURL+'/99999999999')
    .catch((error)=>{
      expect(error.response.status).toBe(404)
      expect(error.response.data).toEqual(NoEmployeeError)
      expect(error.response.statusText).toContain("Not Found")
    })
    })
  })
  describe('When fetching Employee with Manager level',()=>{
    it('should not Display Manager property for Employee with Manager Level', async()=>{
      const res = await axios.get(employeeURL+'/'+managerID)
      expect(res.status).toBe(200)
      expect(res.data).not.toHaveProperty("manager");
    })
  })
})

describe('PUT /employees:id',()=>{
  describe('When fetching single Available Employee with ID provided', () => {
    test('should fetch Single Employee with given ID', async () => {     
      const res = await axios.get(employeeURL+'/'+newEmployeeID)
      expect(res.data).toBeDefined()
      expect(res.status).toBe(200)
    })
  })
  describe('When updating single Employee with ID provided', () => {
    test('should update firstName of existing Employee with given data', async () => {
      const res = await axios.put(employeeURL+'/'+internID,
        {
          "firstName":"Adil",
          "manager":newEmployeeID.toString()
        })
      expect(res.status).toBe(200)
      expect(res.data).toHaveProperty("manager",newEmployeeID.toString())
    })
    test('should fetch Single Employee with updated data', async () => {     
      const res = await axios.get(employeeURL+'/'+internID)
      expect(res.data).toHaveProperty("firstName","Adil")
      expect(res.status).toBe(200)
    })
  })
  describe('When updating single Employee with existing Email', () => {
    test('should throw Duplicate Email error', async () => {
      await axios.put(employeeURL+'/'+internID,
        {
          "email": "soham@gmail.com",
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.duplicateEmailError})  
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
  })
  describe('When updating single Employee with Invalid/Blank Data', () => {
    it('should throw Invalid firstName Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "firstName": 1234
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidFirstNameError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid lastName Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "lastName": 123
        })
        .catch(function(error){
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidLastNameError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid email Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "email": "1234gmail.com"
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidEmailError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid dob Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "dob": "22022000"
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidDOBError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid doj Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "doj": "22-02-000"
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidDOJError})
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid contact Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "contact": "abcd1234"
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": "contact is not valid"})
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid level Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "level": "Develper12"
        })
        .catch(function(error){
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidLevelError})
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid firstName Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "firstName": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidFirstNameError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid lastName Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "lastName": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidLastNameError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid dob Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "dob": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidDOBError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid doj Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "doj": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidDOJError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid contact Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "contact": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": "contact is not valid"}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid level Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "level": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidLevelError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
    it('should throw Invalid email Error', async () => {
      await axios.put(employeeURL+'/'+newEmployeeID,
        {
          "email": ""
        })
        .catch(function(error){
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual({"status": "Fail","reason": constants.invalidEmailError}) 
          expect(error.response.statusText).toContain("Bad Request")
        })
    })
  })
  describe('When updating single Unavailable Employee', () => {
    test('should throw No Employee with given ID Error', async () => {
      await axios.put(employeeURL+'/'+'12345678910',
        {
          "firstName": "Aman"
        })
        .catch(function(error){
          expect(error.response.status).toBe(404)
          expect(error.response.data).toEqual({"status": "Fail","reason": "No Such Employee with given id present"}) 
          expect(error.response.statusText).toContain("Not Found")
        })
    })
  })
})

describe('GET /employees/:id/subordinate',()=>{
  describe('When fetching subordinate of single Employee with ID provided', () => {
    test('should get subordinates of Employee', async () => {
      const res = await axios.get(employeeURL+'/'+newEmployeeID+'/subordinates')
      expect(res.status).toBe(200)
      res.data.forEach((data)=>{
        expect(data).toHaveProperty("manager",newEmployeeID.toString())
      })
    })
  })
  describe('When Fetching Employee with No subordinate', () => {
    test('show fail with No Subordinate Employee for given ID Error', async () => {
      await axios.get(employeeURL+'/'+internID+'/subordinates')
      .catch((error)=>{
        expect(error.response.status).toBe(404)
        expect(error.response.data).toEqual({"reason": `No Subordinate for ${internID} found`,"status": "Fail"})
        expect(error.response.statusText).toContain("Not Found")
      })
    })
  })
})

describe('GET /employees/:id/superiors',()=>{
  describe('When fetching superior of single Employee with ID provided', () => {
    test('should get superiors of Employee', async () => {
      const res = await axios.get(employeeURL+'/'+newEmployeeID+'/superiors')
      expect(res.status).toBe(200)
      expect(res.data).not.toBeNull()
      res.data.forEach((employee)=>{
        expect(employee).toHaveProperty("id",Number(managerID))
      })
    })
  })
  describe('When Fetching Employee with No superior', () => {
    test('should fail with No Superior Employee for given ID Error', async () => {
      await axios.get(employeeURL+'/'+managerID+'/superiors')
      .catch((error)=>{
        expect(error.response.status).toBe(404)
        expect(error.response.data).toEqual({ "status": "Fail", "reason": `No Superior for ${managerID} found` })
        expect(error.response.statusText).toContain("Not Found")
      })
    })
  })
})

describe('DELETE /employees:id',()=>{
  describe('When fetching All Employees', () => {
    test('should fetch All available Employees', async () => {     
      const res = await axios.get(employeeURL)
      expect(res).toBeTruthy()
      expect(res.data).toHaveLength(6)
      expect(res.status).toBe(200)
    })
  })
  describe('When Deleting Single Employee with given ID', () => {
    test('should Delete employee with given ID', async () => {
      const res = await axios.delete(employeeURL+'/'+newEmployeeID)
      expect(res.data).toEqual(newEmployee)
      expect(res.status).toBe(200)
    })
  })
  describe('When fetching Deleted Employee with ID', () => {
    test('should fail with No Employee Found Error', async () => {
      await axios.get(employeeURL+'/'+newEmployeeID)
      .catch((error)=>{
        expect(error.response.status).toBe(404)
        expect(error.response.data).toEqual(NoEmployeeError)
        expect(error.response.statusText).toContain("Not Found")
      })
    })
  })
  // describe('When fetching All Employees post Delete Operation', () => {
  //   test('should fetch All available Employees', async () => {     
  //     await axios.get(employeeURL)
  //     .then((res)=>{
  //       expect(res.data).toHaveLength(5)
  //       expect(res.status).toBe(200)
  //     })
  //   })
  // })
})

describe('GET /employees/level?type=position',()=>{
  describe('When fetching Employees with Developer position', () => {
    test('should fetch all Employees with Developer position', async () => {
      const position:string = "manager";
      const res = await axios.get(employeeURL+'/level?type='+position)
      expect(res.status).toBe(200)
      expect(res.data).not.toBeNull()
      res.data.forEach((employee)=>{
        expect(employee).toHaveProperty("level","Manager")
      })
    })
  })
  describe('When fetching Employees with Unavailable positions', () => {
    test('should fail with No Employee for given type Error', async () => {
      const position:string = "tester";
      await axios.get(employeeURL+'/level?type='+position)
      .catch((error)=>{
        expect(error.response.status).toBe(404)
        expect(error.response.data).toEqual({ "status": "Fail", "reason": `No Employee with ${position} type found` })
      expect(error.response.statusText).toContain("Not Found")
      })
    })
  })
})


// describe('When testing EmployeeController methods', () => {
//   let employeeController:EmployeeController;
//   let service:EmployeeService;
//   beforeEach(() => {
//     employeeController = new EmployeeController();
//     service = new EmployeeService();
//   });
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   describe('When calling the getAllEmployees method', () => {
//     it('should return 200 with result when employees are found', async () => {
//       const mockResult = [
//         {"id":1676527316022,"firstName":"Monika","lastName":"Joseph","email":"monika@gmail.com","contact":"1234123412","dob":"21/02/1992","doj":"25/02/2008","level":"Manager","manager":"na"}, 
//         {"id":1676527316021,"firstName":"Subodh","lastName":"Parulekar","email":"subodh@gmail.com","contact":"98765433210","dob":"21/01/1992","doj":"25/05/2008","level":"Manager","manager":"na"}
//       ];
//       jest.spyOn(employeeController.getAllEmployees, 'get').mockResolvedValue(mockResult);
//       const mockRequest = {};
//       const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       await employeeController.getAllEmployees(mockRequest, mockResponse);
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.send).toHaveBeenCalledWith(mockResult);
//     });

//     it('should return 404 with NoEmployeeError when no employees are found', async () => {
//       jest.spyOn(employeeController.getAllEmployees, 'get').mockResolvedValue([]);
//       const mockRequest = {};
//       const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       await employeeController.getAllEmployees(mockRequest, mockResponse);
//       expect(mockResponse.status).toHaveBeenCalledWith(404);
//       expect(mockResponse.json).toHaveBeenCalledWith(NoEmployeeError);
//     });

//     it('should return 400 with catchBlockError when an error occurs', async () => {
//       jest.spyOn(employeeController.getAllEmployees, 'get').mockRejectedValue(new Error('Something went wrong'));
//       const mockRequest = {};
//       const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       await employeeController.getAllEmployees(mockRequest, mockResponse);
//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith(constants.catchBlockError);
//     });
//   });
// });
