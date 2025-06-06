interface BoxPlanProps {
    template: string;
    plan: string;
    state: string;
}

function BoxPlan({template, plan, state}: BoxPlanProps) {
  return (
    <div className="wrapperPlan">
        <div className="logoCurrentOS">
            <img src="https://hpanel.hostinger.com/assets/images/vpsOnboarding/ubuntu.svg" alt="Ubuntu 24.04 LTS" className="current-os__image" />
        </div>
        <div className="plan">
            <p className="templateOS">{template}</p>
            <span className="planTitle">{plan}</span>
            <span className="cardGreen status">{state}</span>
        </div>
    </div>
  )
}

export default BoxPlan