import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { autorEmail } = createPostDto;

    delete createPostDto.autorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: autorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError(`Author Not Found`);
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      autor: {
        connect: {
          email: autorEmail,
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        autor: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        autor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { autorEmail } = updatePostDto;

    if (!autorEmail) {
      return this.prisma.post.update({
        data: updatePostDto,
        where: {
          id,
        },
      });
    }

    delete updatePostDto.autorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: autorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError(`Author not found`);
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      autor: {
        connect: {
          email: autorEmail,
        },
      },
    };

    return this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: {
        autor: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
