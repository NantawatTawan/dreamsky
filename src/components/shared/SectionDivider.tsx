type Variant = 'wave' | 'cloud' | 'mist';

type Props = {
  variant?: Variant;
  flip?: boolean;
  color?: string;
  className?: string;
};

const paths: Record<Variant, string> = {
  wave: 'M0,60 C240,120 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z',
  cloud:
    'M0,80 C120,40 220,110 340,70 C460,30 560,100 700,70 C840,40 960,110 1100,80 C1240,50 1360,100 1440,70 L1440,120 L0,120 Z',
  mist: 'M0,90 C360,30 720,110 1080,60 C1260,35 1380,70 1440,80 L1440,120 L0,120 Z',
};

export default function SectionDivider({
  variant = 'wave',
  flip = false,
  color = '#F8F9FA',
  className = '',
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-[0] pointer-events-none ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[60px] md:h-[90px]"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
