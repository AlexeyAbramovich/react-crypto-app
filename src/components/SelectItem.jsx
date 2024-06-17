export const SelectItem = ({ option }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
      <img
        src={option.data.icon}
        alt={option.data.label}
        width={24}
        height={24}
      />
      <span>
        ({option.data.label}) {option.data.name}
      </span>
    </div>
  )
}
