import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title="Sign up" />
          <SubHeading title="Enter your information to create an account" />
          <InputBox
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
          />
          <InputBox
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <InputBox
            label="Email"
            type="email"
            name="username"
            placeholder="John@yahoo.com"
          />
          <InputBox
            label="Password"
            type="password"
            name="password"
            placeholder="12345678"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
