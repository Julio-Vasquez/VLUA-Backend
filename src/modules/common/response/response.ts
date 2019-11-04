class Response 
{

  private data: any;
  private msg: string;
  private state: any;

  public status(state : any) 
  {
    this.msg = undefined;
    this.state = state;
    return this;
  }

  public message(type ? : string) 
  {
    this.msg = type;
    return this;
  }

  public json(data ? : any) 
  {
    this.data = data;
    return {
      ...this.state,
      message: this.msg,
      ...this.data
    }
  }
}

export default new Response();