import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeroDto {
  @ApiProperty({ example: 'Superman', description: 'Superhero nickname' })
  readonly nickname: string;
  @ApiProperty({ example: 'Clark Kent', description: 'Superhero real name' })
  readonly real_name: string;
  @ApiProperty({
    example:
      "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
    description: 'Superhero description',
  })
  readonly origin_description: string;
  @ApiProperty({
    example:
      'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
    description: 'Superpower',
  })
  readonly superpowers: string;
  @ApiProperty({
    example: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    description: 'Cath phrase',
  })
  readonly cach_phrase: string;
  readonly images: string[];
}
