import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";

function SignUp() {
  //   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(email, password);

    if (result.success) {
      toast.success("SignUp successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Form noValidate onSubmit={handleSubmit} className="p-2">
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="12"
          controlId="validationFormik103"
          className="position-relative"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationFormik105"
          className="position-relative"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={touched.password && !!errors.password}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i> // Bootstrap Icons eye-slash
              ) : (
                <i className="bi bi-eye"></i> // Bootstrap Icons eye
              )}
            </Button>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationFormik106"
          className="position-relative"
        >
          <input
            type="checkboc"
            className="hover:border-purple-500 transition-colors"
          />
          <Form.Label className="ms-2 text-purple-500">
            I agree that my submitted data is being collected, encrypted and
            stored offline by Alchemy Studios on entertherealm.io.
          </Form.Label>
        </Form.Group>
      </Row>
      <Button
        variant="primary"
        type="submit"
        className="w-100 mb-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sighning in..." : "SignUp"}
      </Button>
    </Form>
  );
}

export default SignUp;
