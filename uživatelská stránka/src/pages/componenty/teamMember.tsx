import Image, { StaticImageData } from "next/image"

interface TeamMemberProps {
    name: string;
    role: string;
    imageSrc: StaticImageData;
}
function TeamMember({ name, role, imageSrc }: TeamMemberProps) {
  return (
    <div className="text-center">
      <Image
        src={imageSrc}
        alt={name}
        width={200}
        height={100}
        className="rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  )
}

export default TeamMember;