const gatherAndDeleteNulls = (email, phone, linkedin) => {
  if (email == null && phone == null) {
    return linkedin;
  }
  const gathered = [email , phone, linkedin]
  gathered.filter(element => element != null);

  return gathered;

}

export default gatherAndDeleteNulls