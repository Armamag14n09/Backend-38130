class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      (this.nombre = nombre),
        (this.apellido = apellido),
        (this.libros = libros || []),
        (this.mascotas = mascotas || []);
    }
  
    getFullName() {
      return `${this.nombre} ${this.apellido}`;
    }
  
    addMascota(mascota) {
      this.mascotas.push(mascota);
    }
  
    countMascotas() {
      return this.mascotas.length;
    }
  
    addBook(nombre, autor) {
      this.libros.push({ nombre, autor });
    }
  
    getBookNames() {
      return this.libros.map(({ nombre }) => nombre).join(", ");
    }
  }
  
  let usuario = new Usuario("Armando", "Maldonado");
    console.log(`El nombre de usuario es: ${usuario.getFullName()}.`);
            usuario.addMascota("Gato");
            usuario.addMascota("Perro");
    console.log(`Este usuario tiene ${usuario.countMascotas()} mascotas.`);
            usuario.addBook("Cien años de soledad", "Gabriel García");
            usuario.addBook("Poemas", "Paul Celan");
    console.log(`Libros del usuario: ${usuario.getBookNames()}`);