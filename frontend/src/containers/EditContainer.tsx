import React from 'react';

// components
import EditName from '../components/Edit/EditName';
// import EditProfile from '../components/Edit/EditProfile';

function EditContainer() {
  return (
    <section>
      <h3 className="a11y-hidden">profile edit</h3>
      {/* <EditProfile /> */}
      <EditName />
      <EditName />
      <EditName />
      <EditName />
      <EditName />
    </section>
  );
}

export default EditContainer;
