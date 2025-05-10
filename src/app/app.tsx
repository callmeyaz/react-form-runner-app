import { YupValidator } from "../yup/YupValidator";
import { useFormRunner } from "react-form-runner";
import { User, user } from "./app.data";
import { userSchema } from "./app.validation";
import { useState } from "react";
import { setDeep } from "../utils/utils";

function App() {
  const [userState, setUserState] = useState<User>(user);
  const {
    errors,
    touched,
    dirty,
    isSubmitting,
    errorFlatList,
    validate,
    validateAsync,
    setIsSubmitting,
    isFormDirty,
    isFormTouched,
    isFormValid,
    getFieldState,
    getFieldTouched,
    setFieldTouched,
    setFieldsTouched,
    setTouchedAll,
    getFieldDirty,
    setFieldDirty,
    setFieldsDirty,
    setDirtyAll,
    getFieldValid,
    getFieldErrors

  } = useFormRunner(new YupValidator(userSchema), userState, {});

  function reset() {
    setUserState(user);
    setDirtyAll(false);
    setTouchedAll(false);
  }

  function addRole() {
    var roles = [...userState.roles, ""]
    setUserState({ ...userState, roles: roles });
    //setFieldsTouched(true, roles.map((_, index) => `roles[${index}]`))
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: 500, border: "1px solid black", padding: "20px 20px 100px 20px", overflow: "auto" }}>

          <table>
            <thead>
              <tr>
                <td colSpan={2}>Field State - First Name</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <pre>{JSON.stringify(getFieldState("name.firstname", userState.name.firstname, userState.name.firstname), null, 2)}</pre>
                </td>
              </tr>
              <tr>
                <td>Field Touched</td>
                <td>{JSON.stringify(getFieldTouched("name.firstname"))}</td>
              </tr>
              <tr>
                <td>Field Dirty</td>
                <td>{JSON.stringify(getFieldDirty("name.firstname"))}</td>
              </tr>
              <tr>
                <td>Field Valid</td>
                <td>{JSON.stringify(getFieldValid("name.firstname"))}</td>
              </tr>
              <tr>
                <td>Field Errors</td>
                <td>{JSON.stringify(getFieldErrors("name.firstname"), null, 2)}</td>
              </tr>
              <tr className="margin-top-20">
                <td colSpan={2}>
                  <button onClick={() => setFieldTouched(true, "name.firstname")} >Set Touched</button>
                  <button onClick={() => setFieldTouched(false, "name.firstname")} >Set Not Touched</button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button onClick={() => setFieldDirty(true, "name.firstname")} >Set Dirty</button>
                  <button onClick={() => setFieldDirty(false, "name.firstname")} >Set Not Dirty</button>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td colSpan={2}>Other Actions</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">

                  <div className="margin-top-20">
                    <button onClick={() => setIsSubmitting(true)} >Set Form Submitting</button>
                    <button onClick={() => setIsSubmitting(false)} >Set Form Not submitting</button>
                  </div>

                  <div className="margin-top-20">
                    <button onClick={() => setTouchedAll(true)} >Set Touched All</button>
                    <button onClick={() => setTouchedAll(false)} >Set Not touched All</button>
                  </div>

                  <div className="margin-top-20">
                    <button onClick={() => setDirtyAll(true)} >Set Dirty All</button>
                    <button onClick={() => setDirtyAll(false)} >Set Not Dirty All</button>
                  </div>

                  <div className="margin-top-20">
                    <button onClick={() => setFieldsTouched(true, ["name.firstname", "name.lastname"])} >Set Touch [First & Last Name]</button>
                  </div>
                  <div className="margin-top-20">
                    <button onClick={() => setFieldsTouched(false, ["name.firstname", "name.lastname"])} >Set Not Touch [First & Last Name]</button>
                  </div>
                  <div className="margin-top-20">
                    <button onClick={() => setFieldsDirty(true, ["name.firstname", "name.lastname"])} >Set Dirty [First & Last Name]</button>
                  </div>
                  <div className="margin-top-20">
                    <button onClick={() => setFieldsDirty(false, ["name.firstname", "name.lastname"])} >Not Dirty [First & Last Name]</button>
                  </div>
                  <div className="margin-top-20">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, padding: "10px 20px", border: "1px solid black", overflow: "auto" }}>

          <div>
            <h2>User Form</h2>
          </div>

          <div>
            {
              !!touched?.name?.firstname &&
              <ul className="error-list">
                {errors?.name?.firstname?.map((item: string, index: number) => <li key={index}>{item}</li>)}
              </ul>
            }
            <label>First Name</label>
            <input type="text" value={userState.name.firstname}
              onChange={(e) => {
                setUserState(s => s && setDeep(s, e.target.value, "name.firstname"));
                setFieldDirty(true, "name.firstname");
              }}
              onBlur={() => {
                setFieldTouched(true, "name.firstname");
              }}
            />
          </div>
          <div className="margin-top-20">
            {
              !!touched?.name?.lastname &&
              <ul className="error-list">
                {errors?.name?.lastname?.map((item: string, index: number) => <li key={index}>{item}</li>)}
              </ul>
            }
            <label>Last Name</label>
            <input type="text" value={userState.name.lastname}
              onChange={(e) => {
                setUserState(s => s && setDeep(s, e.target.value, "name.lastname"));
                setFieldDirty(true, "name.lastname");
              }}
              onBlur={() => {
                setFieldTouched(true, "name.lastname");
              }}
            />
          </div>
          <div className="margin-top-20">
            <label>Roles</label>
            {
              userState.roles.map((item, index) => (
                <div key={index} className="margin-top-20">
                  {
                    !!touched?.roles?.[index] &&
                    <ul className="error-list">
                      {errors?.roles?.[index]?.map((item: string, index: number) => <li key={index}>{item}</li>)}
                    </ul>
                  }
                  <label>Role {index + 1}</label>
                  <input type="text" value={item}
                    key={index} 
                    onChange={
                      (e) => {
                        setUserState(s => s && setDeep(s, e.target.value, `roles[${index}]`));
                        setFieldDirty(true, `roles[${index}]`);
                      }}
                      onBlur={() => {
                        setFieldTouched(true, `roles[${index}]`);
                      }}
                  />
                </div>
              ))
            }
          </div>
          <div className="margin-top-20">
            <button onClick={() => addRole()} >Add Role</button>
          </div>

          <div className="margin-top-20">
            {
              !!touched?.address &&
              <ul className="error-list">
                {errors?.address?.map((item: string, index: number) => <li key={index}>{item}</li>)}
              </ul>
            }
            <label>Address</label>
            <input type="text" value={userState.address}
              onChange={
                (e) => {
                  setUserState(s => s && setDeep(s, e.target.value, "address"));
                  setFieldDirty(true, "address");
                }}
              onBlur={() => {
                setFieldTouched(true, "address");
              }}
            />
          </div>
          <div className="margin-top-20">
            <button onClick={() => reset()} >Reset</button>
          </div>
        </div>

        <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: 600, border: "1px solid black", padding: 20, overflow: "auto" }}>

          <table>
            <thead>
              <tr>
                <td colSpan={2}>Form State</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Is Submitting</td>
                <td>{JSON.stringify(isSubmitting)}</td>
              </tr>
              <tr>
                <td>Is Valid</td>
                <td>{JSON.stringify(isFormValid())}</td>
              </tr>
              <tr>
                <td>Is Dirty</td>
                <td>{JSON.stringify(isFormDirty())}</td>
              </tr>
              <tr>
                <td>Is Touched</td>
                <td>{JSON.stringify(isFormTouched())}</td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td>Form State</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>{JSON.stringify(userState, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td>Form Errors</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td>Form Touched</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>{JSON.stringify(touched, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td>Form Dirty</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>{JSON.stringify(dirty, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="margin-top-20">
            <thead>
              <tr>
                <td>Error List</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <pre>{JSON.stringify(errorFlatList, null, 2)}</pre>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}

export default App
