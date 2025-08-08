import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const response = await prisma.product.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}
export const getProductById = async (req, res) => {
    try {
        const response = await prisma.product.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: "Error fetching product", error });
    }
}
export const createProduct = async (req, res) => {
    const {name, price, description} = req.body;
    try {
        const product = await prisma.product.create({
            data:{
                name: name,
                price: price,
                description: description
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error });
    }
}
export const updateProduct = async (req, res) => {
    const {name, price, description} = req.body;
    try {
        const product = await prisma.product.update({
            where:{
                id: Number(req.params.id),
            },
            data:{
                name: name,
                price: price,
                description: description
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error });
    }
    
}
export const deleteProduct = async (req, res) => {
    try {
        const product = await prisma.product.delete({
            where:{
                id: Number(req.params.id),
            },
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error });
    }
    
}