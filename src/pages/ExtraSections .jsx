import React from "react";

const ExtraSections = () => {
  return (
    <div className="bg-gray-100 py-10">
      {/* Popular Books Section */}
      <section className="container mx-auto mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Example Book Card */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={`https://via.placeholder.com/150?text=Book+Cover+${index + 1}`}
                  alt="Book Cover"
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Book Title {index + 1}</h3>
                <p>Author Name</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Borrow</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Library Services Section */}
      <section className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Library Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Service Card */}
          {[
            { title: "eBooks", description: "Access thousands of eBooks online." },
            { title: "Study Rooms", description: "Reserve private study rooms." },
            { title: "Events", description: "Join our regular library events." },
          ].map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
