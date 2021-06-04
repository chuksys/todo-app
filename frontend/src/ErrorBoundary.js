import React from "react"
import {Container} from "@material-ui/core";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    //log to error monitoring/reporting service  
    console.error("An Error Occured!", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
          <Container maxWidth="lg" style={{ 
              backgroundColor:"#222",
              color:"#fff",
              display:"flex",
              justifyContent: "center",
              alignItems: "center"
              }}>
                <h1>
                    Opps! Something went wrong. We'll fix this asap!
                </h1>
          </Container>
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary