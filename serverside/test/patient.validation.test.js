import {
    registerPatientSchema, loginPatientSchema,
    updatePatientSchema, patientStatusUpdateSchema
} from "../src/validations/patient.validation.js";

// helper function          
function validateTestResult(schema, data) {
    return schema.validate(data);
}

// ------------------------- Test 1 --------------------------------

test('should validate valid patient registration data', () => {

    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser@gmail.com',
        password: '12345678',
        phone: '9876543211'
    };
    //                                validation schema ,   data
    const result = validateTestResult(registerPatientSchema, pateintRegister)

    expect(result.error).toBeUndefined();
    expect(result.value).toBeDefined();


});

// ------------------------- Test 2 --------------------------------
test('should validate valid patient login data', () => {

    const patientLogin = {
        email: 'jestuser@gmail.com',
        password: 'jestuser123'
    };

    const result = validateTestResult(loginPatientSchema, patientLogin);
    expect(result.error).toBeUndefined();
    expect(result.value).toBeDefined();

});

// ------------------------- Test 3  --------------------------------

test('should validate valid patient upadate schema', () => {

    const updatedPatientData = {
        email: 'updatedjestuser@gmail.com'
    };

    const result = validateTestResult(updatePatientSchema, updatedPatientData);

    expect(result.error).toBeUndefined();
    expect(result.value).toBeDefined();
});

// ------------------------- Test 4  --------------------------------

test('should validate valid patient status update schema', () => {
    const patientStatus = {
        isActive: false
    }

    const result = validateTestResult(patientStatusUpdateSchema, patientStatus);

    expect(result.error).toBeUndefined();
    expect(result.value).toBeDefined();

});