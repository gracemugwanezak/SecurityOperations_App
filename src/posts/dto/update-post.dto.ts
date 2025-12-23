import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

// This allows updating title, content, or moving a post to a different client
export class UpdatePostDto extends PartialType(CreatePostDto) { }