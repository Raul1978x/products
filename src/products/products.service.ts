import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { v4 as UuidV4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;

    const newProduct = new Product(
      UuidV4(),
      name,
      description,
      price,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {

    return this.products;
  }

  findOne(id: string): Product {

    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const {id:__, name, description, price } = updateProductDto;
    const product = this.findOne(id);
    product.updateWith({name, description, price})
    return product
    // TODO: Mi forma de hacerlo
    // const product = this.findOne(id);
    // product.name = updateProductDto.name ??product.name 
    // product.description = updateProductDto.description ??product.description 
    // product.price = updateProductDto.price ??product.price 
    // return product
  }

  remove(id: string): Product {

    const product = this.findOne(id);

    this.products = this.products.filter(product => product.id !== id);

    return product;
  }
}
