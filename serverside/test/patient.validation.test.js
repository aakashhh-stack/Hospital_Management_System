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

test('should reject if password filed is missing', () => {
    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser@gmail.com',
        phone: '9876543211'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister);
    expect(result.error).toBeDefined();
});

test('should reject if email is invalid', () => {
    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser_gmail.com',
        phone: '9876543211',
        password: 'jestUser123'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister);
    expect(result.error).toBeDefined();
});

test('should reject if password less than 8 character', () => {
    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser@gmail.com',
        phone: '9876543211',
        password: 'jestUs'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister);
    expect(result.error).toBeDefined();
});

test('should accept password with exactly 8 characters', () => {
    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser@gmail.com',
        phone: '9876543211',
        password: 'jestuser'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister);
    expect(result.error).toBeUndefined();
});


test('should reject if password greater than 12 character', () => {
    const pateintRegister = {
        name: 'jest_user',
        email: 'jestuser@gmail.com',
        phone: '9876543211',
        password: 'jestUsser12456'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister);
    expect(result.error).toBeDefined();
});

test('should reject if patient name is greater than 25 characters', () => {

    const pateintRegister = {
        name: 'bhanupratapsingh_heerathakurkebaap',
        email: 'jestuser@gmail.com',
        password: '12345678',
        phone: '9876543211'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister)
    expect(result.error).toBeDefined();

});

test('should reject if phone number is not 10 digits', () => {

    const pateintRegister = {
        name: 'jestUser',
        email: 'jestuser@gmail.com',
        password: '12345678',
        phone: '98765432'
    };

    const result = validateTestResult(registerPatientSchema, pateintRegister)
    expect(result.error).toBeDefined();

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

test('should reject if email field is missing', () => {

    const patientLogin = {
        password: 'jestuser123'
    };

    const result = validateTestResult(loginPatientSchema, patientLogin);
    expect(result.error).toBeDefined();

});

test('should reject if email is invalid', () => {

    const patientLogin = {
        email:'jestuser_gmail.com',
        password: 'jestuser'
    };

    const result = validateTestResult(loginPatientSchema, patientLogin);
    expect(result.error).toBeDefined();

});
test('should reject if password is less than 8 characters', () => {

    const patientLogin = {
        email:'jestuser@gmail.com',
        password: 'jestus'
    };

    const result = validateTestResult(loginPatientSchema, patientLogin);
    expect(result.error).toBeDefined();

});

test('should reject if  password is greater than 12 characters', () => {

    const patientLogin = {
        email:'jestuser@gmail.com',
        password: 'jestuser001002'
    };

    const result = validateTestResult(loginPatientSchema, patientLogin);
    expect(result.error).toBeDefined();

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